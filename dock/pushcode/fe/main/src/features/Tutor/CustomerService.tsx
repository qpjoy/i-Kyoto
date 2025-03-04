import { useContext } from "react";
import { CustomerContext } from "@/contexts/CustomerContext";
import QYWX from "@/assets/pushcode/企业微信.png";

const CustomerService = () => {
  const { setOpen } = useContext(CustomerContext);

  const goCustomer = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <span>
      欢迎使用 PushCode 推流助手，使用过程中有任何问题均可联系
      <a onClick={goCustomer} href={QYWX}>
        官方客服企微
      </a>
      ，提供技术支持。
    </span>
  );
};

export default CustomerService;
