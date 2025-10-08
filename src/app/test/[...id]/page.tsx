"use client"; // This is a client component

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);
  const identifier = id[0];

  return (
    <div>
      My Post: {id}
      <h1>identifier:{identifier}</h1>
    </div>
  );
}
