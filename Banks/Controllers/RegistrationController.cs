using Banks.Models;
using Banks.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Banks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly RegistrationService _registrationService;

        public RegistrationController(RegistrationService registrationService)
        {
            _registrationService = registrationService;
        }

        [HttpPost]
        [Route("registration")]
        public async Task<IActionResult> Registration(Registration registration)
        {
            if (registration == null || string.IsNullOrWhiteSpace(registration.Email) || string.IsNullOrWhiteSpace(registration.Password))
            {
                return BadRequest("Invalid registration data.");
            }

            try
            {
                await _registrationService.InsertAsync(registration);
                return Ok("Data Inserted");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Database error occurred: {ex.Message}");
            }
        }
    }
}
