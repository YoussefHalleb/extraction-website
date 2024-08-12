using Banks.Models;
using Banks.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;

namespace Banks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly RegistrationService _registrationService;

        public LoginController(IConfiguration configuration, RegistrationService registrationService)
        {
            _config = configuration;
            _registrationService = registrationService;
        }

        private async Task<Registration> AuthenticateUser(string email, string password)
        {
            var filter = Builders<Registration>.Filter.Eq(u => u.Email, email) & Builders<Registration>.Filter.Eq(u => u.Password, password);
            return await _registrationService.FindAsync(filter);
        }

        private string GenerateToken(Registration user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_config["Jwt:ExpireMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            IActionResult response = Unauthorized();
            var authenticatedUser = await AuthenticateUser(loginRequest.Email, loginRequest.Password);
            if (authenticatedUser != null)
            {
                var token = GenerateToken(authenticatedUser);
                response = Ok(new { token = token });
            }
            return response;
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
