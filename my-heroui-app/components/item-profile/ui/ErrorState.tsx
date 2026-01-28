export function ErrorState({ router }: { router: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="max-w-md p-8 border border-red-500/30 bg-red-500/10 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 text-red-400">⚠️</div>
          <h2 className="text-2xl font-bold text-white">Объект не найден</h2>
          <p className="text-gray-300 text-center">
            Запрошенный объект не существует или был удален
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            ← Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
}
