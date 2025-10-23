import Memory from './Memory'

const Memories = ({ user }) => {

  const memories = user?.memories;

  return (
    <div className="px-6 pl-8 mt-8 min-h-screen w-full">
      <div className=" mb-6 ">
        <h1 className="text-2xl font-bold text-[#463b2d]">Günlüklerim</h1>
        <p className="text-sm text-[#5e5346]/80 mt-1">Tüm günlük sayfalarınızı aşağıda bulabilirsiniz.</p>
      </div>

      <div className='flex w-full gap-4 flex-wrap mx-auto mt-10'>
        {memories
          ?.slice()
          .sort((a, b) => new Date(b.memoryCreateDate).getTime() - new Date(a.memoryCreateDate).getTime())
          .map(m => (
            <Memory key={m.memoryId} id={m.memoryId} date={m.memoryCreateDate} isFavorite={m.isFavorite} mood={m.memoryMood} excerpt={m.memorySummary} />
          ))}
      </div>


    </div>
  )
}

export default Memories