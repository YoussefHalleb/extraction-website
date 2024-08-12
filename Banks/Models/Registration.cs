using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Banks.Models
{
    public class Registration
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;    
    }
}
