#import "HlfWrapper.h"
#import <React/RCTLog.h>

@implementation HlfWrapper

RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(hello,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter: (RCTPromiseRejectBlock)reject)
{
  NSArray *result = ...
  if (result) {
    resolve(result);
  } else {
    NSError *error = ...
    reject(@"no_events", @"E_GET_ERROR", error);
  }
}

@end
