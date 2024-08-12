using Banks.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Banks.Services
{
    public class TransactionService
    {
        private readonly IMongoCollection<Transaction> _transactions;
        private static readonly Random random = new Random();

        public TransactionService(IMongoClient client, string dbName, string collectionName)
        {
            var database = client.GetDatabase(dbName);
            _transactions = database.GetCollection<Transaction>(collectionName);
        }

        private string GenerateCustomId()
        {
            var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmssfff"); // Timestamp component
            var randomComponent = random.Next(1000, 9999); // Random component
            return $"{timestamp}{randomComponent}";
        }

        public async Task<List<Transaction>> GetAsync() =>
            await _transactions.Find(_ => true).ToListAsync();

        public async Task<Transaction> GetAsync(string id) =>
            await _transactions.Find(t => t.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Transaction transaction)
        {
            transaction.Id = GenerateCustomId(); // Generate a custom ID
            await _transactions.InsertOneAsync(transaction);
        }

        public async Task UpdateAsync(string id, Transaction transaction) =>
            await _transactions.ReplaceOneAsync(t => t.Id == id, transaction);

        public async Task RemoveAsync(string id) =>
            await _transactions.DeleteOneAsync(t => t.Id == id);
    }
}
