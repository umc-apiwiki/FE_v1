type CategoryTagProps = {
  category: { id: number; name: string }
}

const Category = ({ category }: CategoryTagProps) => {
  return (
    <button
      type="button"
      className="h-[40px]
        w-auto
        bg-white
        border border-brand-500/50
        rounded-[20px]
        flex items-center justify-center
        px-4
        font-sans text-xl font-medium text-info-dark
        shadow-[0px_2px_4px_0px_var(--tw-shadow-color)] shadow-brand-500/25"
    >
      <span># {category.name}</span>
    </button>
  )
}

export default Category
