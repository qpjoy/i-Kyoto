// const [Count1Provider, useCount1] = createStateContext(useNumberState);
// const [Count2Provider, useCount2] = createStateContext(useNumberState);
// const [Count3Provider, useCount3] = createStateContext(useNumberState);
// const [Count4Provider, useCount4] = createStateContext(useNumberState);
// const [Count5Provider, useCount5] = createStateContext(useNumberState);
// const App = () => (
//   <Count1Provider initialValue={10}>
//     {" "}
//     <Count2Provider initialValue={20}>
//       {" "}
//       <Count3Provider initialValue={30}>
//         {" "}
//         <Count4Provider initialValue={40}>
//           {" "}
//           <Count5Provider initialValue={50}>
//             {" "}
//             <Parent />{" "}
//           </Count5Provider>{" "}
//         </Count4Provider>{" "}
//       </Count3Provider>{" "}
//     </Count2Provider>{" "}
//   </Count1Provider>
// );
// const App = () => {
//   const providers = [
//     [Count1Provider, { initialValue: 10 }],
//     [Count2Provider, { initialValue: 20 }],
//     [Count3Provider, { initialValue: 30 }],
//     [Count4Provider, { initialValue: 40 }],
//     [Count5Provider, { initialValue: 50 }]
//   ] as const;
//   return providers.reduceRight(
//     (children, [Component, props]) => createElement(Component, props, children),
//     <Parent />
//   );
// };
