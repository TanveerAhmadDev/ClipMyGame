// import CategoryResult from "./CategoryResult";
// import PostResult from "./PostResult";
// import Section from "./Section";
// import TagResult from "./TagResult";
// import TeamResult from "./TeamResult";
// import UserResult from "./UserResult";

// const SearchDropdown = ({ query, loading, results }) => {
//   const hasResults =
//     results.users?.length ||
//     results.posts?.length ||
//     results.tags?.length ||
//     results.categories?.length ||
//     results.teams?.length;

//   console.log(hasResults);

//   return (
//     <div className="absolute mt-3 w-full rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden">
//       {loading && (
//         <div className="py-8 text-center text-sm text-zinc-500">
//           Searching...
//         </div>
//       )}

//       {!loading && query && !hasResults && (
//         <div className="py-10 text-center text-zinc-500">
//           <p className="font-medium">No results found</p>
//           <p className="text-sm mt-1">
//             Try searching for another player, team or tag.
//           </p>
//         </div>
//       )}

//       {!loading && hasResults && (
//         <div className="max-h-130 overflow-y-auto z-100">
//           {results.users?.length > 0 && (
//             <Section title="Users" count={results.users.length}>
//               {results.users.map((user) => (
//                 <>
//                   <div className="bg-red-900">as</div>
//                   {/* {console.log(user)}
//                   <UserResult key={user._id} user={user} /> */}
//                 </>
//               ))}
//             </Section>
//           )}

//           {results.posts?.length > 0 && (
//             <Section title="Posts" count={results.posts.length}>
//               {results.posts.map((post) => (
//                 <PostResult key={post._id} post={post} />
//               ))}
//             </Section>
//           )}

//           {results.tags?.length > 0 && (
//             <Section title="Tags">
//               {results.tags.map((tag) => (
//                 <TagResult key={tag} tag={tag} />
//               ))}
//             </Section>
//           )}

//           {results.categories?.length > 0 && (
//             <Section title="Categories">
//               {results.categories.map((category) => (
//                 <CategoryResult key={category} category={category} />
//               ))}
//             </Section>
//           )}

//           {results.teams?.length > 0 && (
//             <Section title="Teams" count={results.teams.length}>
//               {results.teams.map((team) => (
//                 <TeamResult key={team._id} team={team} />
//               ))}
//             </Section>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchDropdown;

const SearchDropdown = ({ query, loading, results }) => {
  const hasResults =
    (results?.users?.length || 0) > 0 ||
    (results?.posts?.length || 0) > 0 ||
    (results?.tags?.length || 0) > 0 ||
    (results?.categories?.length || 0) > 0 ||
    (results?.teams?.length || 0) > 0;

  console.log("RESULTS:", results);
  console.log("HAS RESULTS:", hasResults);

  return (
    <div
      className="
        absolute
        top-full
        left-0
        mt-3
        w-full
        min-h-40
        bg-white
        border-4
        border-red-500
        shadow-2xl
        rounded-2xl
        z-[99999]
      "
    >
      <div className="p-5">
        <p className="text-black font-bold">SEARCH DROPDOWN</p>

        <p className="text-black">Loading: {String(loading)}</p>

        <p className="text-black">Users: {results?.users?.length || 0}</p>

        <p className="text-black">Posts: {results?.posts?.length || 0}</p>

        <p className="text-black">Has Results: {String(hasResults)}</p>

        {results?.users?.map((user) => (
          <div
            key={user._id}
            className="
              mt-2
              p-3
              bg-red-900
              text-white
              rounded-lg
            "
          >
            {user.fullName} — @{user.userName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;
