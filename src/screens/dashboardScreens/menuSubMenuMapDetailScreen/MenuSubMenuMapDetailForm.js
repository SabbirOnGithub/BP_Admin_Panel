import { CircularProgress, Grid } from "@material-ui/core";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useEffect } from "react";
import Controls from "../../../components/controls/Controls";
import { Form, useForm } from "../../../components/UseForm/useForm";

const initialFValues = {
  id: "",
  menuSubMenuMapId: "",
  title: "",
  subTitle: "",
  description: EditorState.createEmpty(),
  pictureUrl: "",
  menuId: "",
  subMenuId: "",
  displayOrder: "",
  ctaBtn: "",
  ctaBtnText: "",
  link: "",
  linkText: "",
};

export default function MenuSubMenuMapDetailForm(props) {
  const {
    addOrEdit,
    recordForEdit,
    loadingSave,
    menuSubMenuMaps,
    menus,
    subMenus,
  } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("menuSubMenuMapId" in fieldValues)
      temp.menuSubMenuMapId = fieldValues.menuSubMenuMapId
        ? ""
        : "This field is required.";
    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "This field is required.";
    if ("subTitle" in fieldValues)
      temp.subTitle = fieldValues.subTitle ? "" : "This field is required.";
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
    handleInputNumberChange,
    handleFileChange,
    resetForm,
    handleEditorInput,
    resetFileInput,
  } = useForm(initialFValues, true, validate);

  const felteredMenuSubMenuMaps = menuSubMenuMaps.filter(
    (item) =>
      item.menuId === values.menuId && item.subMenuId === values.subMenuId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        values["description"] = draftToHtml(
          convertToRaw(values.description.getCurrentContent())
        );
      } catch (e) {
        console.log(e);
      } finally {
        addOrEdit(values, resetForm);
      }
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      try {
        setValues({
          ...recordForEdit,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        const html = recordForEdit.description;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const description = EditorState.createWithContent(contentState);
          setValues({
            ...recordForEdit,
            description,
          });
        }
      }
    }
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Select
            name="menuId"
            label="Menu Title"
            value={values.menuId}
            onChange={handleInputChange}
            error={errors.menuId}
            options={menus ? menus : []}
          />
          <Controls.Select
            name="subMenuId"
            label="Sub Menu Title"
            value={values.subMenuId}
            onChange={handleInputChange}
            error={errors.subMenuId}
            options={subMenus ? subMenus : []}
          />
          <Controls.Select
            name="menuSubMenuMapId"
            label="Menu Sub Menu Map Title"
            value={values.menuSubMenuMapId}
            onChange={handleInputChange}
            error={errors.menuSubMenuMapId}
            options={
              menuSubMenuMaps && felteredMenuSubMenuMaps
                ? felteredMenuSubMenuMaps
                : []
            }
          />
          <Controls.Input
            name="title"
            label="Title"
            value={values.title}
            onChange={handleInputChange}
            error={errors.title}
          />
          <Controls.Input
            label="Sub-Title"
            name="subTitle"
            value={values.subTitle}
            onChange={handleInputChange}
            error={errors.subTitle}
          />
          <Controls.RichTextEditor
            onEditorStateChange={(value) =>
              handleEditorInput("description", value)
            } //handleEditorInput(name, value)
            placeholder="Description here..."
            editorState={values.description}
          />
          <Controls.FileInput
            name="pictureUrl"
            label="Picture"
            value={values.pictureUrl}
            onChange={handleFileChange}
            error={errors.pictureUrl}
            resetFileInput={resetFileInput}
          />

          <Controls.Input
            label="Display Order"
            name="displayOrder"
            type="number"
            value={values.displayOrder}
            onChange={handleInputNumberChange}
            error={errors.displayOrder}
          />

          <Controls.Checkbox
            name="ctaBtn"
            label="CTA"
            value={values.ctaBtn}
            onChange={handleInputChange}
            error={errors.ctaBtn}
          />

          <Controls.Input
            label="CTA Button Text"
            name="ctaBtnText"
            value={values.ctaBtnText}
            onChange={handleInputChange}
            error={errors.ctaBtnText}
          />

          <Controls.Checkbox
            name="link"
            label="Link"
            value={values.link}
            onChange={handleInputChange}
            error={errors.link}
          />

          <Controls.Input
            label="Link Text"
            name="linkText"
            value={values.linkText}
            onChange={handleInputChange}
            error={errors.linkText}
          />

          <div>
            {loadingSave ? (
              <CircularProgress size={26} />
            ) : (
              <>
                <Controls.Button type="submit" text="Submit" />
                <Controls.Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}
                />
              </>
            )}
          </div>
          {/* <div><pre>{JSON.stringify(values, undefined, 2)}</pre></div> */}
        </Grid>
      </Grid>
    </Form>
  );
}
