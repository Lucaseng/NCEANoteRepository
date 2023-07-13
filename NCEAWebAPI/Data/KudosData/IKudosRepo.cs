using NCEAWebRepo.Dtos;

namespace NCEAWebRepo.Data.KudosData
{
    public interface IKudosRepo
    {
        IEnumerable<KudosOutputDto> GetKudos();

        public bool CanAwardKudos(KudosInputDto kudos);

        public bool CanDeleteKudos(int id, int userId);
        public KudosOutputDto GiveKudos(KudosInputDto kudos);

        public int GetKudosCount(int Note_ID);

        public IEnumerable<int> GetKudosByUserId(int id);

        public bool DeleteKudos(int noteId);


    }
}
