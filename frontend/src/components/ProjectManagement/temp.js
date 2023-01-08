const handleSubmitButton = async (projectData) =>
{
    // Get Form Data in state handler 
    // Validate Form Data
    let { error } = validateProjectData(formData);
    if (error)
    {
        alert("Validation Error: " + error.message)
        console.log("Validation Error: ",error)
        return;
    }
    // Send Form Data to API

    try
    {
        let apiResponse = await axios.post("http://localhost:4000/project/create-new",formData,{
            headers: { authorization: `${getToken()}` }
        });
        console.log("API Response : ",apiResponse);
        if (!apiResponse.status)
        {
            alert("Error Occured On backend");
        }
        alert("Project Created Successfully");
        props.componentDisplayHandler()

    } catch (error)
    {
        console.log("Error : ",error);
        alert("Error Occured " + error.message)
    }


}