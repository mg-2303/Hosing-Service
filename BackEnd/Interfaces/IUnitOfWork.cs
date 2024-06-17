namespace BackEnd.Interfaces
{
    public interface IUnitOfWork
    {
        ICityRepository CityRepository { get; }

        Task<bool> SaveAsync();
    }
}
