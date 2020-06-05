#import "HlfWrapper.h"
#import <React/RCTLog.h>

@implementation HlfWrapper

RCT_EXPORT_MODULE()
RCT_REMAP_METHOD(sampleMethod,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter: (RCTPromiseRejectBlock)reject)
{
  NSArray *result = ...
  if (result) {
    resolve(result);
  } else {
    NSError *error = ...
    reject(@"no_events", @"There were no events", error);
  }
}

@end
