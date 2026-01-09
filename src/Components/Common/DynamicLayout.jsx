
import Layout from "../../Layout/Layout";
import { useAuth } from "../../Context/AuthContext";
import AdminLayout from "../../Layout/AdminLayout";
import ModeratorAuthorityLayout from "../../Layout/ModeratorAuthorityLayout";


export default function DynamicLayout({ children }) {
  const auth = useAuth();

  if (!auth) return <div>Loading...</div>; 
  const { user } = auth;


  if (!user) return <Layout>{children}</Layout>;

 
  switch (user.role) {
    case "admin":
      return <AdminLayout>{children}</AdminLayout>;
    case "moderator":
      return (
        <ModeratorAuthorityLayout role="moderator">
          {children}
        </ModeratorAuthorityLayout>
      );
    case "authority":
      return (
        <ModeratorAuthorityLayout role="authority">{children}</ModeratorAuthorityLayout>
      );
    default:
      return <Layout>{children}</Layout>;
  }
}
