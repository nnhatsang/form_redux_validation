import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TableUser from "./TableUser";
import { useDispatch, useSelector } from "react-redux";
import {
  filterUsers,
  getValueUser,
  updateUser,
} from "../../redux/UserSlice/userSlice";

const FormUser = () => {
  const dispatch = useDispatch();
  const { showErr } = useSelector((state) => state.userSlice);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      ID: "",
      fullName: "",
      phone: "",
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(getValueUser(values));

      resetForm();
    },
    validationSchema: Yup.object({
      ID: Yup.string().required("Vui lòng không bỏ trống "),
      fullName: Yup.string().required("Vui lòng không bỏ trống "),
      phone: Yup.string()
        .required("Vui lòng không bỏ trống ")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Cần nhập đúng định dạng số điện thoại"
        ),
      email: Yup.string()
        .required("Vui lòng không bỏ trống ")
        .email("Yêu cầu nhập đúng định dạng"),
    }),
  });

  const handleSearch = (e) => {
    const searchKeyword = e.target.value;
    dispatch(filterUsers({ keyword: searchKeyword }));
  };

  return (
    <>
      <div className="max-w-7xl mx-auto py-10">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="ID"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mã SV
                </label>
                <input
                  type="text"
                  name="ID"
                  id="ID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Vui lòng nhập mã SV"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ID}
                />
                {errors?.ID && touched?.ID && (
                  <p className="text-red-500">{errors.ID}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Vui lòng nhập họ tên"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                />
                {errors?.fullName && touched?.fullName && (
                  <p className="text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Vui lòng nhập email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors?.email && touched?.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Vui lòng nhập số điện thoại"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                {errors?.phone && touched?.phone && (
                  <p className="text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="space-x-5 space-y-2">
              <button
                className="bg-black py-2 px-4 rounded-md text-white mt-5 "
                type="submit"
                id="addUser"
              >
                Thêm người dùng
              </button>
              <button
                className="bg-orange-600 py-2 px-4 rounded-md text-white mt-5 hidden"
                type="button"
                id="updateUser"
                onClick={() => {
                  document.getElementById("addUser").style.display =
                    "inline-block";
                  dispatch(updateUser(values));
                  document.getElementById("ID").disabled = false;

                  resetForm();
                }}
              >
                Cập nhật người dùng
              </button>
              <p className="text-red-500">{showErr}</p>
            </div>
          </form>
        </div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleSearch}
          className="my-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="contianer max-w-7xl mx-auto py-10">
        <TableUser setValues={setValues} />
      </div>
    </>
  );
};

export default FormUser;
