using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Data.KudosData
{
    public class KudosRepo : IKudosRepo
    {
        private readonly NCEAWebRepoDBContext _dbContext;
        public KudosRepo(NCEAWebRepoDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public KudosOutputDto CreateKudosOutputDto(Kudos k)
        {
            return new KudosOutputDto
            {
                Kudos_ID = k.Kudos_ID,
                User_ID = k.User.User_ID,
                Note_ID = k.Note.Note_ID
            };
        }


        public IEnumerable<KudosOutputDto> GetKudos()
        {
            IEnumerable<Kudos> kudos = _dbContext.Kudos.Include(k => k.User).Include(k => k.Note).ToList<Kudos>();
            List<KudosOutputDto> newKudos = new List<KudosOutputDto>();
            foreach (Kudos k in kudos)
            {
                newKudos.Add(CreateKudosOutputDto(k));
            }
            return (IEnumerable<KudosOutputDto>)newKudos;
        }

        public int GetKudosCount(int Note_ID)
        {
            int kudos = _dbContext.Kudos.Where(k => k.Note.Note_ID == Note_ID).Count();
            return kudos;
        }

        public bool CanAwardKudos(KudosInputDto kudos)
        {
            Kudos checkKudos = _dbContext.Kudos.FirstOrDefault(k => k.User.User_ID == kudos.User_ID && k.Note.Note_ID == kudos.Note_ID);
            return checkKudos == null;
        }

        public KudosOutputDto GiveKudos(KudosInputDto kudos)
        {
            // Fetch User
            User user = _dbContext.User.FirstOrDefault(u => u.User_ID == kudos.User_ID);

            // Fetch Note
            Note note = _dbContext.Note.FirstOrDefault(n => n.Note_ID == kudos.Note_ID);

            Kudos myKudos = new Kudos
            {
                User = user,
                Note = note

            };
            //Save into database
            EntityEntry<Kudos> e = _dbContext.Kudos.Add(myKudos);
            Kudos awardedKudos = e.Entity;
            _dbContext.SaveChanges();
            return CreateKudosOutputDto(awardedKudos);
        }
        public bool CanDeleteKudos(int noteId, int userId)
        {
            Kudos kudos = _dbContext.Kudos.FirstOrDefault(k => k.Note.Note_ID == noteId && k.User.User_ID == userId);

            return (kudos != null);
        }
        public bool DeleteKudos(int noteId)
        {
            try
            {
                Kudos kudos = _dbContext.Kudos.FirstOrDefault(k => k.Note.Note_ID == noteId);
                _dbContext.Remove(kudos);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public IEnumerable<int> GetKudosByUserId(int id)
        {
            IEnumerable<Kudos> kudos = _dbContext.Kudos.Where(k => k.User.User_ID == id).Include(k => k.User).Include(k => k.Note).ToList<Kudos>();
            List<int> newKudos = new List<int>();
            foreach (Kudos k in kudos)
            {
                newKudos.Add(k.Note.Note_ID);
            }
            return newKudos;

        }



    }
}
