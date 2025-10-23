using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Domain.Entities
{
    public class Memory
    {
        public int MemoryId { get; set; }
        public int UserId { get; set; }
        public string MemoryText { get; set; }
        public int MemoryMood { get; set; }
        public string MemorySummary { get; set; }
        public DateOnly MemoryCreateDate { get; set; }
        public DateOnly? MemoryUpdateDate { get; set; }
        public bool IsFavorite { get; set; }
    }
}
