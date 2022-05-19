const podAreas = {
  "adam-david": [
    "area-Extensions-FileSystem",
    "area-System.Console",
    "area-System.Diagnostics.Process",
    "area-System.IO",
    "area-System.IO.Compression",
    "area-System.Linq.Parallel",
    "area-System.Memory"
  ],
  "buyaa-jose-steve": [
    "area-System.CodeDom",
    "area-System.Configuration",
    "area-System.Reflection",
    "area-System.Reflection.Emit",
    "area-System.Reflection.Metadata",
    "area-System.Resources",
    "area-System.Runtime.CompilerServices",
    "area-System.Text.RegularExpressions",
    "area-System.Threading.Channels",
    "area-System.Threading.Tasks",
    "area-System.DirectoryServices"
  ],
  "akhil-carlos-viktor": [
    "area-Infrastructure-libraries",
    "area-Microsoft.Win32",
    "area-System.Diagnostics.EventLog",
    "area-System.Diagnostics.PerformanceCounter",
    "area-System.Diagnostics.TraceSource",
    "area-System.Drawing",
    "area-System.Management",
    "area-System.ServiceProcess"
  ],
  "drew-michael-tanner": [
    "area-System.Buffers",
    "area-System.Numerics",
    "area-System.Numerics.Tensors",
    "area-System.Runtime",
    "area-System.Runtime.Intrinsics"
  ],
  "eirik-krzysztof-layomi": [
    "area-System.Collections",
    "area-System.Linq",
    "area-System.Text.Json",
    "area-System.Xml"
  ],
  "eric-jeff": [
    "area-Meta"
  ],
  "eric-maryam-tarek": [
    "area-DependencyModel",
    "area-Extensions-Caching",
    "area-Extensions-Configuration",
    "area-Extensions-DependencyInjection",
    "area-Extensions-Hosting",
    "area-Extensions-Logging",
    "area-Extensions-Options",
    "area-Extensions-Primitives",
    "area-System.ComponentModel",
    "area-System.ComponentModel.Composition",
    "area-System.Composition",
    "area-System.Diagnostics.Activity",
    "area-System.Globalization"
  ],
  "jeremy-levi": [
    "area-System.Formats.Asn1",
    "area-System.Formats.Cbor",
    "area-System.Security",
    "area-System.Text.Encoding",
    "area-System.Text.Encodings.Web"
  ]
};

module.exports = [
  {
    podName: "Adam / David",
    podMembers: [
      { name: "Adam", user: "adamsitnik" },
      { name: "David", user: "jozkee" }
    ],
    repos: {
      "runtime": podAreas["adam-david"],
      "dotnet-api-docs": podAreas["adam-david"]
    },
  },
  {
    podName: "Buyaa / Jose / Steve",
    podMembers: [
      { name: "Buyaa", user: "buyaa-n" },
      { name: "Jose", user: "joperezr" },
      { name: "Steve H", user: "steveharter" }
    ],
    repos: {
      "runtime": podAreas["buyaa-jose-steve"],
      "dotnet-api-docs": podAreas["buyaa-jose-steve"]
    }
  },
  {
    podName: "Akhil / Carlos / Viktor",
    podMembers: [
      { name: "Akhil", user: "smasher164" },
      { name: "Carlos", user: "carlossanlop" },
      { name: "Viktor", user: "viktorhofer" }
    ],
    repos: {
      "runtime": podAreas["akhil-carlos-viktor"],
      "dotnet-api-docs": podAreas["akhil-carlos-viktor"]
    }
  },
  {
    podName: "Drew / Michael / Tanner",
    podMembers: [
      { name: "Drew", user: "dakersnar" },
      { name: "Michael", user: "michaelgsharp" },
      { name: "Tanner", user: "tannergooding" }
    ],
    repos: {
      "machinelearning": true,
      "runtime": podAreas["drew-michael-tanner"],
      "dotnet-api-docs": podAreas["drew-michael-tanner"]
    }
  },
  {
    podName: "Eirik / Krzysztof / Layomi",
    podMembers: [
      { name: "Eirik", user: "eiriktsarpalis" },
      { name: "Krzysztof", user: "krwq" },
      { name: "Layomi", user: "layomia" }
    ],
    repos: {
      "runtime": podAreas["eirik-krzysztof-layomi"],
      "dotnet-api-docs": podAreas["eirik-krzysztof-layomi"]
    }
  },
  {
    podName: "Eric / Jeff",
    podMembers: [
      { name: "Eric", user: "ericstj" },
      { name: "Jeff", user: "jeffhandley" }
    ],
    repos: {
      "fabricbot-config": true,
      "runtime": podAreas["eric-jeff"],
      "dotnet-api-docs": podAreas["eric-jeff"]
    }
  },
  {
    podName: "Eric / Maryam / Tarek",
    podMembers: [
      { name: "Eric", user: "eerhardt" },
      { name: "Maryam", user: "maryamariyan" },
      { name: "Tarek", user: "tarekgh" }
    ],
    repos: {
      "runtime": podAreas["eric-maryam-tarek"],
      "dotnet-api-docs": podAreas["eric-maryam-tarek"]
    }
  },
  {
    podName: "Jeremy / Levi",
    podMembers: [
      { name: "Jeremy", user: "bartonjs" },
      { name: "Levi", user: "GrabYourPitchForks" }
    ],
    repos: {
      "runtime": podAreas["jeremy-levi"],
      "dotnet-api-docs": podAreas["jeremy-levi"]
    }
  },
  {
    podName: "Libraries Analyzers",
    podMembers: [
      { name: "Buyaa", user: "buyaa-n" },
      { name: "Carlos", user: "carlossanlop" }
    ],
    repos: {
      "runtime": ["code-fixer", "code-analyzer"],
      "roslyn-analyzers": ["Area-Microsoft.NetCore.Analyzers"]
    }
  }
];
