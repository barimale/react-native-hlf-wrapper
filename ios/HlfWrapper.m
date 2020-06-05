#import "HlfWrapper.h"
#import <React/RCTLog.h>

@implementation HlfWrapper

RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(hello,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter: (RCTPromiseRejectBlock)reject)
{
  NSError *error;
  NSString *result = [NSString hello error:&error];
  if (result) {
    resolve(result);
  } else {
    reject(@"E_GET_ERROR", error);
  }
}

@end
