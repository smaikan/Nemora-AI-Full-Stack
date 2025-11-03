```

BenchmarkDotNet v0.15.5, Windows 11 (10.0.22621.4317/22H2/2022Update/SunValley2)
Intel Core i5-7300HQ CPU 2.50GHz (Kaby Lake), 1 CPU, 4 logical and 4 physical cores
.NET SDK 9.0.200
  [Host] : .NET 9.0.2 (9.0.2, 9.0.225.6610), X64 RyuJIT x86-64-v3

Toolchain=InProcessNoEmitToolchain  WarmupCount=0  

```
| Method                 | Mean     | Error    | StdDev   | Median    |
|----------------------- |---------:|---------:|---------:|----------:|
| CreateMemory_Benchmark | 33.10 ms | 34.09 ms | 88.00 ms | 0.2883 ms |
