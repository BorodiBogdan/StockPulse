import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import { changePassword } from "../../actions/actions";
import ChangePasswordForm from "../../components/ChangePasswordForm";

export default async function Profile() {
    const session = await getServerSession(options);
    const username = session?.user?.name;
    const email = session?.user?.email || null;

    if (!session || typeof username != "string" || typeof email != "string")
        return notFound();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
            <ChangePasswordForm username={username} email={email} />
        </div >
    );
};