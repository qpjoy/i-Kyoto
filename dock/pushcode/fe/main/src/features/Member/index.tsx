import { useContext } from "react";
import "./Member.css";
import Check from "@/assets/img/check.svg";
import { CustomerContext } from "@/contexts/CustomerContext";

function Member() {
  const { setOpen } = useContext(CustomerContext);

  const contactService = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="member section-box" id="members">
      <div className="member_container">
        <div className="member_title">月会员</div>
        <div className="member_price">
          <span>￥15 </span>/月
        </div>

        <div className="member_discount">折合每天0.5元</div>

        <div className="member_contact">
          <a className="btn" onClick={contactService}>
            联系客服购买
          </a>
        </div>

        <div className="member_device">
          <img src={Check} />
          增加新设备额外支付 7元/月/台
        </div>
      </div>

      <div className="member_container">
        <div className="member_title">季会员</div>
        <div className="member_price">
          <span>￥36 </span>/季
        </div>

        <div className="member_discount">折合每天0.4元</div>

        <div className="member_contact">
          <a className="btn" onClick={contactService}>
            联系客服购买
          </a>
        </div>

        <div className="member_device">
          <img src={Check} />
          增加新设备额外支付 18元/季/台
        </div>
      </div>

      <div className="member_container">
        <div className="member_title">年会员</div>
        <div className="member_price">
          <span>￥108 </span>/年
        </div>

        <div className="member_discount">折合每天0.3元</div>

        <div className="member_contact">
          <a className="btn" onClick={contactService}>
            联系客服购买
          </a>
        </div>

        <div className="member_device">
          <img src={Check} />
          增加新设备额外支付 60元/年/台
        </div>
      </div>
    </div>
  );
}

export default Member;
