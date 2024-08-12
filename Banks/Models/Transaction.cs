using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Banks.Models
{
    public class Transaction
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
       
    }
}
