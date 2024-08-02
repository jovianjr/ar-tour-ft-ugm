import dataFT from './ft-ugm'

export default [
  {
    type: 'initialization',
    label: 'GPS',
    data: {
      target: [110.37385674541716, -7.765868098622165]
    }
  },
  {
    type: 'scene',
    label: 'Tugu FT UGM',
    data: dataFT.tugu
  },
  {
    type: 'direction',
    label: 'Tugu - SGLC',
    data: {
      title: 'Menuju SGLC',
      path: [
        [110.3737673, -7.765928],
        [110.3737351, -7.7658855],
        [110.3737056, -7.765843],
        [110.3736439, -7.7658244],
        [110.3735903, -7.7658111],
        [110.373534, -7.7657925],
        [110.3734776, -7.7657739],
        [110.3734213, -7.7657526],
        [110.3733623, -7.7657393],
        [110.3732952, -7.7657207],
        [110.3732389, -7.7657074],
        [110.373196, -7.7656915],
        [110.3731397, -7.7656782],
        [110.3730914, -7.765633],
        [110.3730512, -7.7655666],
        [110.3730136, -7.7655294],
        [110.3729439, -7.7655081],
        [110.3728822, -7.7654948],
        [110.3728232, -7.7654842],
        [110.3727615, -7.7654656],
        [110.3727078, -7.765447],
        [110.3726569, -7.765431],
        [110.3726032, -7.7654151]
      ],
      target: [110.37233119910238, -7.765341062570343],
      targetArea: [110.37264868806609, -7.765460589355741]
    }
  },
  {
    type: 'scene',
    label: 'SGLC',
    data: dataFT.sglc
  },
  {
    type: 'direction',
    label: 'SGLC-PerpusFT',
    data: {
      title: 'Menuju Perpustakaan FT UGM',
      path: [
        [110.3725684, -7.7654603],
        [110.3725657, -7.7654789],
        [110.372563, -7.7655161],
        [110.372563, -7.7655506],
        [110.3725657, -7.7655825],
        [110.3725684, -7.7656171],
        [110.372563, -7.7656436],
        [110.372563, -7.7656755],
        [110.372555, -7.7657101],
        [110.3725496, -7.76575],
        [110.3725389, -7.7657792],
        [110.3725255, -7.7658058],
        [110.3725174, -7.7658297],
        [110.3725147, -7.7658642],
        [110.3725094, -7.7659068]
      ],
      target: [110.37251578769578, -7.76596081626144],
      targetArea: [110.3725435062661, -7.765835131131301]
    }
  },
  {
    type: 'scene',
    label: 'Perpusatakaan FT UGM',
    data: dataFT.library
  },
  {
    type: 'direction',
    label: 'PerpusFT-DTGL',
    data: {
      title: 'Menuju Departemen Teknik Geologi',
      path: [
        [110.3725281, -7.7658536],
        [110.3725362, -7.7658137],
        [110.3725496, -7.7657739],
        [110.3726006, -7.7657553],
        [110.3726569, -7.7657127],
        [110.3727186, -7.7657579],
        [110.3727561, -7.7658084],
        [110.3727803, -7.7658403],
        [110.3728098, -7.7658908],
        [110.3728312, -7.765928],
        [110.3728554, -7.7659705],
        [110.372901, -7.7659945],
        [110.3729492, -7.7660077],
        [110.3729895, -7.7660237],
        [110.3730351, -7.766037],
        [110.3730753, -7.7660503]
      ],
      target: [110.3732060173831, -7.766030133180019],
      targetArea: [110.3730906360757, -7.766012608080718]
    }
  },
  {
    type: 'scene',
    label: 'DTGL',
    data: dataFT.dtgl
  },
  {
    type: 'direction',
    label: 'DTGL-DTNTF',
    data: {
      title: 'Menuju Departemen Teknik Nuklir dan Teknik Fisika',
      path: [
        [110.3730834, -7.766021],
        [110.3730378, -7.7660184],
        [110.3729895, -7.7660077],
        [110.3729358, -7.7659865],
        [110.3728768, -7.7659652],
        [110.3728393, -7.7659519],
        [110.3728285, -7.7659971],
        [110.3728178, -7.7660343],
        [110.3728044, -7.7660768],
        [110.3727883, -7.7661167],
        [110.3727776, -7.7661619]
      ],
      target: [110.3728009862674, -7.766282572259142],
      targetArea: [110.37283153261983, -7.766170909229272]
    }
  },
  {
    type: 'scene',
    label: 'DTNTF',
    data: dataFT.dtntf
  },
  {
    type: 'direction',
    label: 'DTNTF-DTETI',
    data: {
      title: 'Menuju Departemen Teknik Elektro dan Teknologi Informasi',
      path: [
        [110.3728205, -7.7660556],
        [110.3728446, -7.7659998],
        [110.3728124, -7.7659546],
        [110.3727749, -7.7658961],
        [110.3727427, -7.7658323],
        [110.3727052, -7.7657712],
        [110.3726676, -7.7657154],
        [110.3726086, -7.7656941],
        [110.3725442, -7.7656915],
        [110.3724745, -7.7656676],
        [110.3724235, -7.7656596],
        [110.3723565, -7.765641],
        [110.3722948, -7.7656277],
        [110.372217, -7.7656064],
        [110.372158, -7.7655932],
        [110.3720909, -7.7655719],
        [110.3720292, -7.7655506],
        [110.371981, -7.7655028],
        [110.3719407, -7.765447],
        [110.3719005, -7.7654124],
        [110.3718469, -7.7654257],
        [110.371812, -7.7654762],
        [110.3717932, -7.7655373],
        [110.3717771, -7.7656038],
        [110.371753, -7.7656676],
        [110.3717315, -7.7657154],
        [110.3717154, -7.7657739],
        [110.3716993, -7.765835],
        [110.3717342, -7.7658802]
      ],
      target: [110.37182195776123, -7.765998208808277],
      targetArea: [110.37167305753164, -7.765883216447107]
    }
  },
  {
    type: 'scene',
    label: 'DTETI',
    data: dataFT.dteti
  },
  {
    type: 'direction',
    label: 'DTETI-DTMI',
    data: {
      title: 'Menuju Departemen Teknik Mesin dan Teknik Industri',
      path: [
        [110.3716779, -7.7658616],
        [110.3716323, -7.7658509],
        [110.3715786, -7.7658323],
        [110.371525, -7.7658191],
        [110.3714767, -7.7658031],
        [110.3714231, -7.7657925],
        [110.3713587, -7.7657739],
        [110.3713024, -7.7657553],
        [110.3712541, -7.7657393]
      ],
      target: [110.3710977608629, -7.765737763497304],
      targetArea: [110.3712347673178, -7.765745768172122]
    }
  },
  {
    type: 'scene',
    label: 'DTMI',
    data: dataFT.dtmi
  },
  {
    type: 'direction',
    label: 'DTMI-DTK',
    data: {
      title: 'Menuju Departemen Teknik Kimia',
      path: [
        [110.3712943, -7.7657181],
        [110.3713158, -7.7656782],
        [110.3713292, -7.765625],
        [110.3713453, -7.7655746],
        [110.3713614, -7.7655267],
        [110.3713802, -7.7654736],
        [110.3713989, -7.7654231],
        [110.371415, -7.7653752],
        [110.3714257, -7.76533]
      ],
      target: [110.37140893597564, -7.765187673155813],
      targetArea: [110.37141038221611, -7.76533420238005]
    }
  },
  {
    type: 'scene',
    label: 'DTK',
    data: dataFT.dtk
  },
  {
    type: 'direction',
    label: 'DTK-DTAP',
    data: {
      title: 'Menuju Departemen Teknik Arsitektur dan Perencanaan',
      path: [
        [110.3714713, -7.7653938],
        [110.3715384, -7.7654178],
        [110.3716189, -7.765439],
        [110.3716832, -7.7654523],
        [110.3717718, -7.7654257],
        [110.3718495, -7.7653832],
        [110.3718951, -7.7652928],
        [110.3719327, -7.7651945],
        [110.3719676, -7.7651095],
        [110.3720507, -7.7650643],
        [110.3721258, -7.7650324],
        [110.372209, -7.7650032],
        [110.3722814, -7.7650244],
        [110.3723618, -7.7650457],
        [110.3724343, -7.7650165],
        [110.372453, -7.7649447],
        [110.3724772, -7.7648676],
        [110.3724933, -7.7648038],
        [110.372504, -7.7647374],
        [110.3725201, -7.764663],
        [110.3725362, -7.7645886],
        [110.3724799, -7.7645514],
        [110.3724128, -7.7645195],
        [110.3723457, -7.7644982],
        [110.3722733, -7.7644716],
        [110.372217, -7.7644451],
        [110.3721607, -7.7644158],
        [110.372107, -7.764376]
      ],
      target: [110.37189706162881, -7.764090103717625],
      targetArea: [110.3721873837295, -7.764371320736481]
    }
  },
  {
    type: 'scene',
    label: 'DTAP',
    data: dataFT.dtap
  },
  {
    type: 'direction',
    label: 'DTAP-DTGD',
    data: {
      title: 'Menuju Departemen Teknik Geodesi',
      path: [
        [110.3721499, -7.7643946],
        [110.3722304, -7.7643707],
        [110.3722626, -7.7643042],
        [110.3722921, -7.7642378],
        [110.3723136, -7.7641766],
        [110.372335, -7.7641208],
        [110.3723565, -7.7640703],
        [110.3724316, -7.7640969],
        [110.3724959, -7.7641182],
        [110.3725657, -7.7641394],
        [110.372622, -7.764158],
        [110.3726703, -7.7641341],
        [110.3726891, -7.7640916]
      ],
      target: [110.37266650307647, -7.764002065696451],
      targetArea: [110.37264658774792, -7.764136678484668]
    }
  },
  {
    type: 'scene',
    label: 'DTGD',
    data: dataFT.dtgd
  },
  {
    type: 'direction',
    label: 'DTGD-DTSL',
    data: {
      title: 'Departmen Teknik Sipil dan Lingkungan',
      path: [
        [110.3726891, -7.7641554],
        [110.3727481, -7.764174],
        [110.3728098, -7.7641899],
        [110.372858, -7.7642059],
        [110.3729144, -7.7642192],
        [110.3729036, -7.7642803],
        [110.3728956, -7.7643228],
        [110.3728849, -7.764376],
        [110.3729305, -7.7643893],
        [110.372968, -7.7644025]
      ],
      target: [110.37311952885565, -7.764467270551398],
      targetArea: [110.37294480034436, -7.764434772876104]
    }
  },
  {
    type: 'scene',
    label: 'DTSL',
    data: dataFT.dtsl
  },
  {
    type: 'direction',
    label: 'DTSL-MasjidFT',
    data: {
      title: 'Masjid Al-Mustadam Fakultas Teknik UGM',
      path: [
        [110.3729331, -7.7643972],
        [110.3728902, -7.7644105],
        [110.3728661, -7.764469],
        [110.3728446, -7.7645301],
        [110.3728285, -7.7645912],
        [110.3727588, -7.7645912],
        [110.3726891, -7.7645833],
        [110.372622, -7.7645673],
        [110.3725576, -7.7645567],
        [110.3725308, -7.7646338],
        [110.3725147, -7.7646922],
        [110.3724852, -7.7647533],
        [110.3724235, -7.7647321]
      ],
      target: [110.37224678594043, -7.76467856063731],
      targetArea: [110.3722501950157, -7.764673540896787]
    }
  },
  {
    type: 'scene',
    label: 'MasjidFT',
    data: dataFT.masjidFT
  },
  {
    type: 'closing',
    label: '-',
    data: {
      description:
        'Selamat! Anda telah menjelajahi Fakultas Teknik UGM. Kami berharap informasi yang telah kami sampaikan bisa memberikan gambaran yang jelas dan bermanfaat bagi Anda. Jangan ragu untuk mengeksplorasi lebih lanjut atau bertanya lebih lanjut tentang apa pun yang Anda minati di fakultas ini. Terima kasih atas kunjungan Anda!'
    }
  }
]
