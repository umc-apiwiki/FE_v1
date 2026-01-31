type CategoryTagProps = {
  category: { id: number; name: string }
}

const CategoryTag = ({ category }: CategoryTagProps) => {
  return (
    <button
      type="button"
      className="h-[35px]
        w-auto
        bg-white
        border border-brand-500/25
        rounded-[25px]
        flex items-center justify-center
        px-4
        font-sans text-[18px] font-medium text-brand-500
        shadow-[1px_1px_5px_1px_var(--tw-shadow-color)] shadow-brand-500/10
        hover:bg-brand-500 hover:-translate-y-1 hover:text-white
        transition-all duration-200"
    >
      <span>{category.name}</span>
    </button>
  )
}

export default CategoryTag
