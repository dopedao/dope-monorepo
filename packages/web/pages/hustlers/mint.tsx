// import { Hustler, Hustler__factory } from '@dopewars/contracts';
// Parking this for future…

// const { chainId, library, account } = useWeb3React();

// const hustlers = useMemo(
//   () =>
//     chainId
//       ? Hustler__factory.connect(
//           NETWORK[chainId as 1 | 4].contracts.hustlers,
//           library.getSigner(),
//         )
//       : null,
//   [chainId, library],
// );

// const onSubmit = useCallback(
//   async (values: HustlerCustomization) => {
//     if (!hustlers) return;
//     hustlers.setMetadata(
//       0,
//       values.name,
//       values.color,
//       values.background,
//       '0x00000000',
//       [0, 0, 0, 0],
//       [0, 0, 0, 0],
//       '',
//     );
//   },
//   [hustlers],
// );