export default async function identifierPage({
  params,
}: {
  params: Promise<{ identifier: string }>;
}) {
  const { identifier } = await params;
  console.log(identifier);
  const page = identifier[identifier.length - 1];
  console.log(page);
  if (page === "reset-password") {
    return <h1>Arshnoor</h1>;
  } else {
    return <h1>identifier string is wrong</h1>;
  }
}
