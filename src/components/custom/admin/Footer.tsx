export default function Footer({ company_name }: { company_name: string }) {
  return (
    <footer className="border-t p-4 text-center text-sm text-muted-foreground h-10">
      © 2024 {company_name}. All rights reserved.
    </footer>
  );
}
