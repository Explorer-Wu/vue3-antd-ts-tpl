# Vue 3 + TypeScript + Vite

## 清理TypeScript缓存的方法

清理TypeScript缓存的方法有多种，下面分别介绍这些方法。

### 方法一：手动删除缓存目录

TypeScript的缓存目录默认位于用户的主目录下的.tsccache文件夹中。我们可以通过手动删除这个文件夹来清理TypeScript的缓存。首先，关闭所有正在运行的TypeScript编辑器和终端。然后，找到.tsccache文件夹，并将其删除。最后，重新打开编辑器或终端，并重新编译TypeScript代码，就可以使用清理后的缓存进行编译。

### 方法二：使用TypeScript提供的命令行选项

TypeScript编译器提供了一些命令行选项，可以用来清理缓存。下面是一些常用的选项：

--incremental：通过增量编译来提高编译性能。如果希望清理缓存，则可以使用--noIncremental选项来禁用增量编译，从而清除缓存。
--clean：用于清理整个缓存目录，相当于手动删除缓存目录。

```
  tsc --noIncremental
```
