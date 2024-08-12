using Banks.Models;
using Banks.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Banks.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _transactionService;

        public TransactionsController(TransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Transaction transaction)
        {
            if (transaction == null || string.IsNullOrWhiteSpace(transaction.Text))
            {
                return BadRequest("Transaction is null or text is empty.");
            }

            await _transactionService.CreateAsync(transaction);
            return CreatedAtAction(nameof(Get), new { id = transaction.Id }, transaction);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transactions = await _transactionService.GetAsync();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var transaction = await _transactionService.GetAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var transaction = await _transactionService.GetAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            await _transactionService.RemoveAsync(id);
            return NoContent();
        }
    }
}
