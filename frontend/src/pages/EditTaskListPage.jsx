import Container from "../component/Container/Container";
import EditTaskListForm from "../component/Form/EditTaskListForm";

function EditTaskListPage () {
    return (
        <main>
            <Container>
                <h1>EDIT</h1>
                <EditTaskListForm />
            </Container>
        </main>
    );
}

export default EditTaskListPage;