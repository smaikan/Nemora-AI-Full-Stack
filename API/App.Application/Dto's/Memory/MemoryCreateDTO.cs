using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Application.Dto_s.Memory
{
    public class MemoryCreateDTO
    {
        public int UserId { get; set; }
        public string MemoryText { get; set; }
        public DateOnly? MemoryCreateDate { get; set; }
        
    }
}
