using Banks.Models;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace Banks.Services
{
    public class RegistrationService
    {
        private readonly IMongoCollection<Registration> _registrationCollection;

        public RegistrationService(IMongoClient mongoClient, string databaseName, string collectionName)
        {
            var database = mongoClient.GetDatabase(databaseName);
            _registrationCollection = database.GetCollection<Registration>(collectionName);
        }

        public async Task InsertAsync(Registration registration)
        {
            await _registrationCollection.InsertOneAsync(registration);
        }

        public async Task<Registration> FindAsync(FilterDefinition<Registration> filter)
        {
            return await _registrationCollection.Find(filter).FirstOrDefaultAsync();
        }
    }
}
