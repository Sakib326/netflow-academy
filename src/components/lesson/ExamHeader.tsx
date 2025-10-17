"use client";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLessionSidebar,
  openLessionSidebar,
  setLessionSidebarForScreen,
} from "@/redux/theme/themeSlice";
const ExamHeader = () => {
  const { isLessionSidebarOpen } = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();
  return (
    <div className="tw:px-4 tw:h-[64px] tw:max-h-[64px] tw:mb-4 tw:text-start tw:bg-gradient-to-r tw:to-blue-600 tw:from-indigo-600 tw:flex tw:justify-between tw:items-center">
      <h1 className="tw:text-xl tw:font-bold tw:text-slate-50 tw:mb-0">Exam</h1>

      <div className="tw:lg:hidden">
        {isLessionSidebarOpen ? (
          <button onClick={() => dispatch(closeLessionSidebar())}>
            {/* hamberger maneu */}
            <MdClose className="tw:text-2xl tw:text-white" />
          </button>
        ) : (
          <button onClick={() => dispatch(openLessionSidebar())}>
            {/* hamberger maneu */}
            <FaBars className="tw:text-2xl tw:text-white" />
          </button>
        )}
      </div>
    </div>
  );
};
export default ExamHeader;
