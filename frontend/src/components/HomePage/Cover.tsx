export default function Cover({ tags }: { tags: string[] }) {
    return <div className="w-full h-[100vh] flex flex-col items-center justify-center p-4">
        <p className="text-4xl mb-6">Kapakki Lo</p>
        <div className="text-center leading-loose">
          {
            tags.map(
              (tag) => <span key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><span className="mr-0.5">#</span>{tag}</span>
            )
          }
        </div>
      </div>
}