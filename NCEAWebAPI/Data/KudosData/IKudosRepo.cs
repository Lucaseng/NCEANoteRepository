using NCEAWebRepo.Dtos;

namespace NCEAWebRepo.Data.KudosData
{
    public interface IKudosRepo
    {
        IEnumerable<KudosOutputDto> GetKudos();

        public bool CanAwardKudos(KudosInputDto kudos);
        public KudosOutputDto GiveKudos(KudosInputDto kudos);

        public int GetKudosCount(int Note_ID);


    }
}
