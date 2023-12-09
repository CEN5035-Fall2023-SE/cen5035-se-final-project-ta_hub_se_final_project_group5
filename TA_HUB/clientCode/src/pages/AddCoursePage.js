import AddCourseForm from "../components/courseAdd";
import { useRouter } from 'next/router';
const AddCoursePage = () => {
    const router = useRouter();
    const handleFormSubmit = (values) => {
        // Send a POST request to your server to add the course
        console.log('Received values of form: ', values);
        axios
          .post('http://localhost:3005/submit-form', { email, password, name, usertype })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setSuccessModalVisible(true); // Show the success modal
            }
          })
          .catch((err) => console.log(err));
      };
    
    return (
      <div>
        <h1>Add a New Course</h1>
        <AddCourseForm onFinish={handleFormSubmit} />
      </div>
    );
  };

  export default AddCoursePage;
  