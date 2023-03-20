import React from 'react'
import {useForm} from "react-hook-form";
import { nanoid } from "nanoid";



export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    } = useForm({
    mode: "onChange",
    defaultValues: { 
      title: "",
      description: "",
      people: [] },
  });

  function onSubmit (data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });

  }

  return (
   
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          name="title"
          type="text"
          {...register("title",{required:"Task başlığı yazmalısınız",minLength: { value: 3, message: "Task başlığı en az 3 karakter olmalı" },})}
        />
        <p className="input-error">
          {errors.title &&  <p> {errors.title.message}</p>}
        </p>
       </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description",{
            required: "Bu alani doldurmalisiniz",
            minLength: {
              value: 10,
              message: "En az 10 karakter girmelisiniz!!",
            },
          })}
        ></textarea>
        <p className="input-error">{errors.description && <p>{errors.description.message}</p>}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people",
                 {required: "Lütfen en az bir kişi seçin",
                 validate : {
                  maxLimit : 
                   (kisiler) => kisiler.length <=3 || "En fazla 3 kişi seçebilirsiniz."
          }})}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people && <p>{errors.people.message}</p>}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  
  
  )
}
