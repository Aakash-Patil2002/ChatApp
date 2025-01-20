import style from "./SidebarSkeleton.module.css";
import { Users } from "lucide-react";
function SidebarSkeleton() {
  const skeletonContact = Array(8).fill(null);

  return (
    <aside className={style.sidebar}>
      <div className="d-flex">
        <Users className={style.users} />
        <h3 className={style.sidebar_heading}>Contacts</h3>
      </div>
      <div className={style.skeleton_body}>
        {skeletonContact.map((_, idx) => {
          return (
            <div
              key={idx}
              className="w-100 d-flex align-items-center gap-3 p-3"
            >
              <div className="position-relative mx-auto mx-lg-0">
                <div className="rounded-circle" />
              </div>
              <div>
                <div></div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default SidebarSkeleton;
