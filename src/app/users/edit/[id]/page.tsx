import AddUserEdit from "../../add/_components/add-user-form";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <AddUserEdit />
    </div>
  );
};

export default page;
