using BenchmarkDotNet.Running;
using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Jobs;
using BenchmarkDotNet.Toolchains.InProcess.NoEmit; // 🔹 bu eklendi

namespace App.Tests.Performance
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = DefaultConfig.Instance
                .WithOptions(ConfigOptions.DisableOptimizationsValidator)
                .AddJob(Job
                    .Default
                    .WithToolchain(InProcessNoEmitToolchain.Instance) 
                    .WithWarmupCount(0));

            BenchmarkRunner.Run<MemoryServiceBenchmark>(config);
        }
    }
}
