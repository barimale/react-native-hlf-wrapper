#import "HlfWrapper.h"
#import <hlfsdk/Hlfsdk.h>

@implementation HlfWrapper

RCT_EXPORT_MODULE(Hlfsdk);
RCT_REMAP_METHOD(hello,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter: (RCTPromiseRejectBlock)reject)
{

  NSString *result = [NSString hello];
  if (result) {
    resolve(result);
  } else {
    reject(@"E_GET_ERROR", @"Get operation failed", result);
  }
}

@end
