import {Grid} from "@material-ui/core";
import {EditorState} from "draft-js";
import React, {useEffect} from "react";
import Controls from "../../../components/controls/Controls";
import {Form, useForm} from "../../../components/UseForm/useForm";

const initialFValues = {
	id: "",
	title: "",
	description: EditorState.createEmpty(),
	pictureUrl: "",
};

export default function TrainingDetailForm(props) {
	const {addOrEdit, recordForEdit} = props;

	const validate = (fieldValues = values) => {
		let temp = {...errors};
		if ("title" in fieldValues)
			temp.title = fieldValues.title ? "" : "This field is required.";
		setErrors({
			...temp,
		});

		if (fieldValues === values)
			return Object.values(temp).every((x) => x === "");
	};

	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		handleFileChange,
		resetForm,
		handleEditorInput,
		resetFileInput,
	} = useForm(initialFValues, true, validate);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (validate()) {
	// 		try {
	// 			values["description"] = draftToHtml(
	// 				convertToRaw(values.description.getCurrentContent())
	// 			);
	// 		} catch (e) {
	// 			console.log(e);
	// 		} finally {
	// 			addOrEdit(values, resetForm);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	if (recordForEdit != null) {
	// 		try {
	// 			setValues({
	// 				...recordForEdit,
	// 			});
	// 		} catch (e) {
	// 			console.warn(e);
	// 		} finally {
	// 			const html = recordForEdit.description;
	// 			const contentBlock = htmlToDraft(html);
	// 			if (contentBlock) {
	// 				const contentState = ContentState.createFromBlockArray(
	// 					contentBlock.contentBlocks
	// 				);
	// 				const description = EditorState.createWithContent(contentState);
	// 				setValues({
	// 					...recordForEdit,
	// 					description,
	// 				});
	// 			}
	// 		}
	// 	}
	// }, [recordForEdit, setValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(values)
		if (validate()) {
			// console.log(values)
			addOrEdit(values, resetForm);
		}
	};

	useEffect(() => {
		if (recordForEdit != null)
			setValues({
				...recordForEdit,
			});
	}, [recordForEdit, setValues]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={12}>
					<Controls.Input
						label="Title"
						name="title"
						value={values.title}
						onChange={handleInputChange}
						error={errors.title}
					/>

					<Controls.Input
						style={{textAlign: "left"}}
						label="Description"
						name="description"
						multiline
						rows={2}
						value={values.description}
						onChange={handleInputChange}
						error={errors.description}
					/>
					{/* <Controls.RichTextEditor
						onEditorStateChange={(value) =>
							handleEditorInput("description", value)
						} //handleEditorInput(name, value)
						placeholder="Description here..."
						editorState={values.description}
					/> */}
					<Controls.FileInput
						name="pictureUrl"
						label="Picture"
						value={values.pictureUrl}
						onChange={handleFileChange}
						error={errors.pictureUrl}
						resetFileInput={resetFileInput}
					/>

					<div>
						<Controls.Button type="submit" text="Submit" />
						<Controls.Button text="Reset" color="default" onClick={resetForm} />
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}
