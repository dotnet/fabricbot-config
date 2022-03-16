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
  "carlos-jeremy": [
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
    users: [ "adamsitnik", "jozkee" ],
    repos: {
      "runtime": podAreas["adam-david"],
      "dotnet-api-docs": podAreas["adam-david"]
    },
  },
  {
    podName: "Buyaa / Jose / Steve",
    users: [ "buyaa-n", "joperezr", "steveharter" ],
    repos: {
      "runtime": podAreas["buyaa-jose-steve"],
      "dotnet-api-docs": podAreas["buyaa-jose-steve"]
    }
  },
  {
    podName: "Carlos / Jeremy",
    users: [ "carlossanlop", "bartonjs" ],
    repos: {
      "runtime": podAreas["carlos-jeremy"],
      "dotnet-api-docs": podAreas["carlos-jeremy"]
    }
  },
  {
    podName: "Drew / Michael / Tanner",
    users: [ "dakersnar", "michaelgsharp", "tannergooding" ],
    repos: {
      "machinelearning": true,
      "runtime": podAreas["drew-michael-tanner"],
      "dotnet-api-docs": podAreas["drew-michael-tanner"]
    }
  },
  {
    podName: "Eirik / Krzysztof / Layomi",
    users: [ "eiriktsarpalis", "krwq", "layomia" ],
    repos: {
      "runtime": podAreas["eirik-krzysztof-layomi"],
      "dotnet-api-docs": podAreas["eirik-krzysztof-layomi"]
    }
  },
  {
    podName: "Eric / Jeff",
    users: [ "ericstj", "jeffhandley" ],
    repos: {
      "fabricbot-config": true,
      "runtime": podAreas["eric-jeff"],
      "dotnet-api-docs": podAreas["eric-jeff"]
    }
  },
  {
    podName: "Eric / Maryam / Tarek",
    users: [ "eerhardt", "maryamariyan", "tarekgh" ],
    repos: {
      "runtime": podAreas["eric-maryam-tarek"],
      "dotnet-api-docs": podAreas["eric-maryam-tarek"]
    }
  },
  {
    podName: "Jeremy / Levi",
    users: [ "bartonjs", "GrabYourPitchForks" ],
    repos: {
      "runtime": podAreas["jeremy-levi"],
      "dotnet-api-docs": podAreas["jeremy-levi"]
    }
  }
];
