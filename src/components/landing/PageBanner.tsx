function PageBanner({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-blue-50 pb-16 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-lg text-gray-600">{description}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

export { PageBanner }
