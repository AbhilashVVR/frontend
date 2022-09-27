import React  from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./index.css";
import { Button, Grid, TextField, Typography } from "@mui/material";
import config from "config";
import swal from "sweetalert";
import { useQuill } from "react-quilljs";
import "../../../../node_modules/quill/dist/quill.snow.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 4,
  borderRadius: 2,
};
//initialize the component
const UpdateModal = ({
  handleClose,
  open,
  singleQuestion,
  setCallData,
  callData,
}) => {
  const [updateValue, setUpdateValue] = React.useState({
    question: singleQuestion?.question,
    option1: singleQuestion?.option1,
    option2: singleQuestion?.option2,
    option3: singleQuestion?.option3,
    option4: singleQuestion?.option4,
    correctAnswer: singleQuestion?.correctAnswer,
  });
  //quill editor
  const [editorState, setEditorState] = React.useState("")
  const { quill, quillRef } = useQuill();
   React.useEffect(() => {
     if (quill) {
       if (singleQuestion?.question) { 
          quill.clipboard.dangerouslyPasteHTML(singleQuestion?.question);
          quill.on("text-change", () => {
            setEditorState(quill.root.innerHTML);
          });
       }
       else {
          quill.clipboard.dangerouslyPasteHTML("");
          quill.on("text-change", () => {
            setEditorState(quill.root.innerHTML);
          });
       }
     }
    }, [quill, singleQuestion.question]);
 
  const handleFieldChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUpdateValue({
      ...updateValue,
      [fieldName]: fieldValue,
    });
       };
       
// submit
  const handleUpdateQuestion = (e) => {
    e.preventDefault();
    const UpdatedData = {
      ...updateValue,
      question: editorState,
    };

    fetch(
      `${config.apiServer}/excercise/editExcerciseQuestion/${singleQuestion?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(UpdatedData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleClose();
          swal({
            title: "Update Successfully",
            icon: "success",
            buttons: true,
            dangerMode: true,
          }).then((willUpdate) => {
            if (willUpdate) {
              setCallData(!callData);
            }
          });
        }
      })
      .catch((err) => {
        swal({
          title: "Update Failed",
          text: "Please try again",
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleUpdateQuestion}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {/* editor */}
                <Grid item xs={12} sx={{mb:5}}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Question
                  </Typography>
                  <Box>
                    {/* qillTextEditor */}
                    <div style={{ width: "100%", height: "150px" }}>
                      <div ref={quillRef} />
                    </div>
                  </Box>
                </Grid>
                {/* textfield  */}
                <Grid item xs={12}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Option A
                  </Typography>
                  <TextField
                    name="option1"
                    defaultValue={singleQuestion?.option1}
                    onChange={handleFieldChange}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Option B
                  </Typography>
                  <TextField
                    name="option2"
                    defaultValue={singleQuestion?.option2}
                    onChange={handleFieldChange}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Option C
                  </Typography>
                  <TextField
                    name="option3"
                    defaultValue={singleQuestion?.option3}
                    onChange={handleFieldChange}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Option D
                  </Typography>
                  <TextField
                    name="option4"
                    defaultValue={singleQuestion?.option4}
                    onChange={handleFieldChange}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Correct Answer
                  </Typography>
                  <TextField
                    name="correctAnswer"
                    defaultValue={singleQuestion?.correctAnswer}
                    onChange={handleFieldChange}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                {/* button */}
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button type="submit" variant="contained" color="secondary">
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                    sx={{ mx: 2 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default UpdateModal;

