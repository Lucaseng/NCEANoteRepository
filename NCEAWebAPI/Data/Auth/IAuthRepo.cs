namespace NCEAWebRepo.Data.Auth
{
    public interface IAuthRepo
    {
        public bool ValidLogin(string Email, string Password);

        public bool ValidAdmin(string Email, string Password);

    }
}
