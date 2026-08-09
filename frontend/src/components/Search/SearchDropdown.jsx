import CategoryResult from "./CategoryResult";
import PostResult from "./PostResult";
import Section from "./Section";
import TagResult from "./TagResult";
import TeamResult from "./TeamResult";
import UserResult from "./UserResult";

const SearchDropdown = ({ query, loading, results }) => {
  const hasResults =
    results.users?.length ||
    results.posts?.length ||
    results.tags?.length ||
    results.categories?.length ||
    results.teams?.length;

  return (
    <div className="absolute mt-3 w-full rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden">
      {loading && (
        <div className="py-8 text-center text-sm text-zinc-500">
          Searching...
        </div>
      )}

      {!loading && query && !hasResults && (
        <div className="py-10 text-center text-zinc-500">
          <p className="font-medium">No results found</p>
          <p className="text-sm mt-1">
            Try searching for another player, team or tag.
          </p>
        </div>
      )}

      {!loading && hasResults && (
        <div className="max-h-[520px] overflow-y-auto">
          {results.users?.length > 0 && (
            <Section title="Users" count={results.users.length}>
              {results.users.map((user) => (
                <UserResult key={user._id} user={user} />
              ))}
            </Section>
          )}

          {results.posts?.length > 0 && (
            <Section title="Posts" count={results.posts.length}>
              {results.posts.map((post) => (
                <PostResult key={post._id} post={post} />
              ))}
            </Section>
          )}

          {results.tags?.length > 0 && (
            <Section title="Tags">
              {results.tags.map((tag) => (
                <TagResult key={tag} tag={tag} />
              ))}
            </Section>
          )}

          {results.categories?.length > 0 && (
            <Section title="Categories">
              {results.categories.map((category) => (
                <CategoryResult key={category} category={category} />
              ))}
            </Section>
          )}

          {results.teams?.length > 0 && (
            <Section title="Teams" count={results.teams.length}>
              {results.teams.map((team) => (
                <TeamResult key={team._id} team={team} />
              ))}
            </Section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
