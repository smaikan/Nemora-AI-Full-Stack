using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Domain.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        [EmailAddress]
        public string UserEmail { get; set; }
        public string UserPasswordHash { get; set; }
        public ICollection<Memory>? UserMemories { get; set; }
    }
}
