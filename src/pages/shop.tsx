import { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const COLORS = ["All", "Black", "White", "Olive"] as const;
const FITS = ["All", "Oversized", "Regular", "Cropped", "Polo"] as const;

export default function Shop() {
  const [colorFilter, setColorFilter] = useState<string>("All");
  const [fitFilter, setFitFilter] = useState<string>("All");
  const [tagFilter, setTagFilter] = useState<"All" | "New" | "BestSeller">("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (colorFilter !== "All") {
      result = result.filter(p => p.color === colorFilter);
    }
    if (fitFilter !== "All") {
      result = result.filter(p => p.fit === fitFilter);
    }
    if (tagFilter === "New") {
      result = result.filter(p => p.isNew);
    } else if (tagFilter === "BestSeller") {
      result = result.filter(p => p.isBestSeller);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case "featured":
      default:
        result.sort((a, b) => (a.isBestSeller === b.isBestSeller) ? 0 : a.isBestSeller ? -1 : 1);
        break;
    }

    return result;
  }, [colorFilter, fitFilter, tagFilter, sortBy]);

  const Radio = ({
    label,
    selected,
    onClick,
  }: { label: string; selected: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer group w-full text-left"
    >
      <span
        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
          selected ? "bg-black border-black" : "border-gray-300 group-hover:border-black"
        }`}
      >
        {selected && <span className="w-2 h-2 bg-white" />}
      </span>
      <span className={`text-sm ${selected ? "font-bold" : "text-gray-600 group-hover:text-black"}`}>
        {label}
      </span>
    </button>
  );

  const FilterPanel = (
    <>
      <div>
        <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Color</h3>
        <div className="space-y-3">
          {COLORS.map((color) => (
            <Radio
              key={color}
              label={color}
              selected={colorFilter === color}
              onClick={() => setColorFilter(color)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Fit</h3>
        <div className="space-y-3">
          {FITS.map((fit) => (
            <Radio
              key={fit}
              label={fit}
              selected={fitFilter === fit}
              onClick={() => setFitFilter(fit)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Collection</h3>
        <div className="space-y-3">
          <Radio label="All Pieces" selected={tagFilter === "All"} onClick={() => setTagFilter("All")} />
          <Radio label="New Arrivals" selected={tagFilter === "New"} onClick={() => setTagFilter("New")} />
          <Radio label="Best Sellers" selected={tagFilter === "BestSeller"} onClick={() => setTagFilter("BestSeller")} />
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => { setColorFilter("All"); setFitFilter("All"); setTagFilter("All"); }}
        className="rounded-none text-xs font-bold uppercase tracking-widest w-full"
      >
        Reset Filters
      </Button>
    </>
  );

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">

        <header className="py-12 border-b mb-12">
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight mb-4">Collection</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">The complete archive of LYVON heavyweight pieces. Minimal color, maximum structure.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-32 space-y-10">
              {FilterPanel}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <Button
                type="button"
                variant="outline"
                className="md:hidden rounded-none font-bold uppercase tracking-widest"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>

              <div className="flex items-center gap-4 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">{filteredAndSortedProducts.length} Results</span>
                <div className="w-48">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">New Arrivals</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {mobileFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="md:hidden overflow-hidden bg-muted/30 p-6 mb-8 border border-border space-y-8"
              >
                {FilterPanel}
              </motion.div>
            )}

            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                {filteredAndSortedProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-2xl font-display uppercase text-muted-foreground">No pieces match your selection.</p>
                <Button
                  variant="link"
                  type="button"
                  onClick={() => { setColorFilter("All"); setFitFilter("All"); setTagFilter("All"); }}
                  className="mt-4 uppercase tracking-widest font-bold"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
