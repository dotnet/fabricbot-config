const podAreas = {
  "adam-david-jeremy": [
    "area-Extensions-Caching",
    "area-Extensions-FileSystem",
    "area-System.Console",
    "area-System.Diagnostics.Process",
    "area-System.Formats.Asn1",
    "area-System.Formats.Cbor",
    "area-System.IO",
    "area-System.IO.Hashing",
    "area-System.Linq.Parallel",
    "area-System.Security"
  ],
  "buyaa-steve": [
    "area-Extensions-DependencyInjection",
    "area-Extensions-Hosting",
    "area-System.CodeDom",
    "area-System.ComponentModel",
    "area-System.ComponentModel.Composition",
    "area-System.Composition",
    "area-System.Configuration",
    "area-System.Reflection",
    "area-System.Reflection.Emit",
    "area-System.Reflection.Metadata",
    "area-System.Resources",
    "area-System.Text.RegularExpressions",
    "area-System.DirectoryServices"
  ],
  "akhil-carlos-viktor": [
    "area-DependencyModel",
    "area-Infrastructure-libraries",
    "area-Microsoft.Win32",
    "area-System.Diagnostics.EventLog",
    "area-System.Diagnostics.PerformanceCounter",
    "area-System.Diagnostics.TraceSource",
    "area-System.Drawing",
    "area-System.Formats.Tar",
    "area-System.IO.Compression",
    "area-System.Management",
    "area-System.ServiceProcess"
  ],
  "drew-michael-tanner": [
    "area-System.Buffers",
    "area-System.Memory",
    "area-System.Numerics",
    "area-System.Numerics.Tensors",
    "area-System.Runtime",
    "area-System.Runtime.CompilerServices",
    "area-System.Runtime.Intrinsics",
    "area-System.Threading.Channels",
    "area-System.Threading.Tasks"
  ],
  "eirik-krzysztof-layomi-tarek": [
    "area-Extensions-Configuration",
    "area-Extensions-Logging",
    "area-Extensions-Options",
    "area-Extensions-Primitives",
    "area-System.Diagnostics.Activity",
    "area-System.Globalization",
    "area-System.Collections",
    "area-System.ComponentModel.DataAnnotations",
    "area-System.DateTime",
    "area-System.IO.Ports",
    "area-System.Linq",
    "area-System.Text.Encoding",
    "area-System.Text.Encodings.Web",
    "area-System.Text.Json",
    "area-System.Xml"
  ],
  "eric-jeff": [
    "area-Meta"
  ]
};

module.exports = [
  {
    podName: "Adam / David / Jeremy",
    podMembers: [
      { name: "Adam", user: "adamsitnik" },
      { name: "David", user: "jozkee" },
      { name: "Jeremy", user: "bartonjs" }
    ],
    repos: {
      "runtime": podAreas["adam-david-jeremy"],
      "dotnet-api-docs": podAreas["adam-david-jeremy"]
    },
  },
  {
    podName: "Buyaa / Steve",
    podMembers: [
      { name: "Buyaa", user: "buyaa-n" },
      { name: "Steve H", user: "steveharter" }
    ],
    repos: {
      "runtime": podAreas["buyaa-steve"],
      "dotnet-api-docs": podAreas["buyaa-steve"]
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
    podName: "Eirik / Krzysztof / Layomi / Tarek",
    podMembers: [
      { name: "Eirik", user: "eiriktsarpalis" },
      { name: "Krzysztof", user: "krwq" },
      { name: "Layomi", user: "layomia" },
      { name: "Tarek", user: "tarekgh" }
    ],
    repos: {
      "runtime": podAreas["eirik-krzysztof-layomi-tarek"],
      "dotnet-api-docs": podAreas["eirik-krzysztof-layomi-tarek"]
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
    podName: "Libraries Analyzers",
    podMembers: [
      { name: "Buyaa", user: "buyaa-n" },
      { name: "Carlos", user: "carlossanlop" }
    ],
    repos: {
      "runtime": ["code-fixer", "code-analyzer"]
    }
  }
];
